import { useRef } from "react"

type CaptureMode = "user" | "environment" | undefined

type Props = {
    onCapture: (file: File) => void
    captureMode?: CaptureMode
}

export function useTectonicCamera({ onCapture, captureMode = "environment"}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const openCamera = () => {
        inputRef.current?.click()
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
                if (file) {
                    onCapture(file)
                }
            }}
        />
    )

    return { openCamera, CameraInput }
}