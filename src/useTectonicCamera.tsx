import { useRef } from "react"

type CaptureMode = "user" | "environment" | undefined

type Props = {
    onCapture: (file: File, fieldId?: string) => void
    onError?: (error: string, fieldId?: string) => void
    captureMode?: CaptureMode
}

export function useTectonicCamera({ onCapture, onError, captureMode = "environment"}: Props) {
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

                if (!file) {
                    onError?.("No file selected", fieldId || undefined)
                    return
                }

                if (!fieldId) {
                    onError?.("Field ID is missing", fieldId || undefined)
                    return
                }

                onCapture(file, fieldId)
            }}
        />
    )

    return { openCamera, CameraInput }
}
