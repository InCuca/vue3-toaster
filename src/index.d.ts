interface ToastOptions {
    message?: string
    type?: 'success' | 'info' | 'warning' | 'error' | 'default'
    position?: 'top' | ' bottom' | ' top-right' | ' bottom-right' | 'top-left' | 'bottom-left',
    duration?: number
    dismissible?: boolean
    onClick?: () => void
    onClose?: () => void
    queue?: boolean
    maxToasts?: number
    pauseOnHover?: boolean
    useDefaultCss?: boolean
}

export type { ToastOptions }
export default {} as Plugin_2

declare module 'vue' {
    interface ComponentCustomProperties {
        $toast: {
			clear: () => void
            show: (message: string, ToastOptions: ToastOptions) => void
            success: (message: string) => void
            error: (message: string) => void
            warning: (message: string) => void
            info: (message: string) => void
        }
    }
}
