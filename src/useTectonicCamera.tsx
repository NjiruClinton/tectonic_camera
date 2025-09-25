import { useRef } from "react"

type CaptureMode = "user" | "environment" | undefined

type Props = {
    onCapture: (file: File, fieldId?: string) => void
    captureMode?: CaptureMode
}

export function useTectonicCamera({ onCapture, captureMode = "environment"}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const openCamera = (fieldId?: string) => {
        inputRef.current?.click()
        inputRef.current?.setAttribute('data-field-id', fieldId || '')
    }

    const CameraInput = () => (
        <input
            type="file"
            accept="image/*"
            capture={captureMode}
            ref={inputRef}
            style={{ display: "none" }}
            onChange={e => {
                const file = e.target.files?.[0]
                const fieldId = e.target.getAttribute('data-field-id')
                if (file) {
                    onCapture(file, fieldId || undefined)
                }
            }}
        />
    )

    return { openCamera, CameraInput }
}