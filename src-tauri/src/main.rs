// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::OpenOptions;
use std::io::Write;
use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, WindowEvent};

fn log_path() -> PathBuf {
    let base = std::env::var_os("LOCALAPPDATA")
        .map(PathBuf::from)
        .unwrap_or_else(std::env::temp_dir);
    let dir = base.join("Master Track");
    let _ = std::fs::create_dir_all(&dir);
    dir.join("master_track.log")
}

fn log_line(msg: &str) {
    let ts = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);
    if let Ok(mut f) = OpenOptions::new().create(true).append(true).open(log_path()) {
        let _ = writeln!(f, "[{}] {}", ts, msg);
    }
}

fn install_panic_hook() {
    std::panic::set_hook(Box::new(|info| {
        let location = info
            .location()
            .map(|l| format!("{}:{}:{}", l.file(), l.line(), l.column()))
            .unwrap_or_else(|| "<unknown>".to_string());
        let payload = info
            .payload()
            .downcast_ref::<&str>()
            .copied()
            .or_else(|| {
                info.payload()
                    .downcast_ref::<String>()
                    .map(String::as_str)
            })
            .unwrap_or("<non-string payload>");
        log_line(&format!("PANIC at {} :: {}", location, payload));
    }));
}

#[cfg(windows)]
fn show_existing_instance() -> bool {
    use windows_sys::Win32::UI::WindowsAndMessaging::{
        FindWindowW, IsIconic, SetForegroundWindow, ShowWindow, SW_RESTORE, SW_SHOW,
    };

    let title: Vec<u16> = "Master Track / LoL\0".encode_utf16().collect();
    let window = unsafe { FindWindowW(std::ptr::null(), title.as_ptr()) };

    if window == 0 {
        return false;
    }

    unsafe {
        if IsIconic(window) != 0 {
            ShowWindow(window, SW_RESTORE);
        } else {
            ShowWindow(window, SW_SHOW);
        }
        SetForegroundWindow(window);
    }
    true
}

#[cfg(windows)]
fn acquire_single_instance_mutex() -> bool {
    use windows_sys::Win32::Foundation::{GetLastError, ERROR_ALREADY_EXISTS};
    use windows_sys::Win32::System::Threading::CreateMutexW;

    let name: Vec<u16> = "Local\\pl.maks.lolmastertrack\0".encode_utf16().collect();
    let handle = unsafe { CreateMutexW(std::ptr::null(), 0, name.as_ptr()) };

    if handle == 0 {
        return false;
    }

    let err = unsafe { GetLastError() };
    err != ERROR_ALREADY_EXISTS
}

fn show_main_window(app: &tauri::AppHandle) {
    if let Some(window) = app.get_window("main") {
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn main() {
    install_panic_hook();
    log_line("=== Master Track starting ===");

    #[cfg(windows)]
    {
        if show_existing_instance() {
            log_line("Found existing window, focusing and exiting.");
            return;
        }

        if !acquire_single_instance_mutex() {
            log_line("Another instance owns the mutex; trying to focus it.");
            show_existing_instance();
            return;
        }
    }

    let show = CustomMenuItem::new("show".to_string(), "Pokaz Master Track");
    let quit = CustomMenuItem::new("quit".to_string(), "Zamknij calkowicie");
    let tray_menu = SystemTrayMenu::new().add_item(show).add_item(quit);

    let build_result = tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } | SystemTrayEvent::DoubleClick { .. } => {
                show_main_window(app);
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "show" => show_main_window(app),
                "quit" => app.exit(0),
                _ => {}
            },
            _ => {}
        })
        .on_window_event(|event| {
            if let WindowEvent::CloseRequested { api, .. } = event.event() {
                let _ = event.window().hide();
                api.prevent_close();
            }
        })
        .run(tauri::generate_context!());

    if let Err(e) = build_result {
        log_line(&format!("Tauri run() returned Err: {:?}", e));
    }
}
