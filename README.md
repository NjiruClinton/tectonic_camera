# tectonic_camera

A minimal React hook for capturing high-quality photos using the **native device camera** (no live preview).  
Developers have full control over UI, styling, and state management.

---

## ✨ Features

- 📸 Opens the **native camera app** (front or back)
- 🎨 No fixed UI → you control buttons and styling
- 💾 Get the image as a `File` for storing in state, uploading, etc.
- 📱 Works on mobile browsers (desktop falls back to file picker)
- ⚡ Zero dependencies, lightweight

---

## 📦 Installation

```bash
npm install tectonic-camera
```
## 🚀 Usage

```tsx
import { useState } from "react"
import { useTectonicCamera } from "tectonic-camera"

function App() {
  const [photo, setPhoto] = useState<File | null>(null)

  const { openCamera, CameraInput } = useTectonicCamera({
    captureMode: "environment", // "user" (front), "environment" (rear), or undefined
    onCapture: (file) => setPhoto(file)
  })

  return (
    <div>
      {/* Hidden input */}
      <CameraInput />

      {/* Developer controls buttons */}
      <button onClick={openCamera}>Open Camera</button>

      {photo && (
        <div>
          <img
            src={URL.createObjectURL(photo)}
            alt="preview"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
          <button onClick={() => setPhoto(null)}>Remove Photo</button>
        </div>
      )}
    </div>
  )
}
```

## ⚙️ API
`useTectonicCamera(options)`
### Options
- `captureMode?: "user" | "environment"`
Which camera to open (defaults to "environment").
- `onCapture: (file: File) => void`
Callback when a photo is taken.

### Returns
- `openCamera: () => void` → Call this to trigger the camera
- `CameraInput: React.FC` → Hidden `<input>` element (must be rendered once)