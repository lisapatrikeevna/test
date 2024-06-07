import React, { useEffect, useRef } from 'react';

type UnityInstance = {
    SetFullscreen: (value: number) => void;
    SendMessage: (objectName: string, methodName: string, message: string) => void;
};

declare let createUnityInstance: (canvas: HTMLCanvasElement, config: object, onProgress: (progress: number) => void) => Promise<UnityInstance>;

declare global {
    interface Window {
        sendJsonToUnity: (json: object) => void;
        ReceiveImageFromUnity: (encodedImage: string) => void;
    }
}

const Unity: React.FC = () => {
    const unityInstanceRef = useRef<UnityInstance | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "src/Unity/Build/Build.loader.js";
        script.onload = () => {
            createUnityInstance(document.getElementById("unity-canvas") as HTMLCanvasElement, {
                dataUrl: "src/Unity/Build/Build.data",
                frameworkUrl: "src/Unity/Build/Build.framework.js",
                codeUrl: "src/Unity/Build/Build.wasm",
                streamingAssetsUrl: "src/Unity/Build/Build.data",
                companyName: "DefaultCompany",
                productName: "NeoXonline",
                productVersion: "0.1.0",
            }, (progress: number) => {
                const progressBarFull = document.getElementById("unity-progress-bar-full") as HTMLDivElement;
                const width = `${100 * progress}%`;
                progressBarFull.style.width = width;
            }).then((unityInstance: UnityInstance) => {
                unityInstanceRef.current = unityInstance;

                const canvas = document.getElementById("unity-canvas") as HTMLCanvasElement;
                canvas.width = 960;
                canvas.height = 600;
                const loadingBar = document.getElementById("unity-loading-bar") as HTMLDivElement;
                loadingBar.style.display = "none";
                const fullscreenButton = document.getElementById("unity-fullscreen-button") as HTMLDivElement;
                fullscreenButton.onclick = () => unityInstance.SetFullscreen(1);
            }).catch((message: string) => {
                alert(message);
            });
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Экспортируем функцию для отправки данных в Unity
    window.sendJsonToUnity = (json: object) => {
        if (unityInstanceRef.current) {
            const jsonString = JSON.stringify(json);
            console.log(`Sending JSON to Unity: ${jsonString}`);
            unityInstanceRef.current.SendMessage('WebGLRequestHandler', 'HandleJson', jsonString);
        } else {
            console.error('Unity instance is not initialized yet.');
        }
    };

    return (
        <div id="unity-container" className="unity-desktop">
            <canvas id="unity-canvas"  tabIndex={-1}></canvas>
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
            <div id="unity-warning"></div>
            <div id="unity-footer">
                <div id="unity-webgl-logo"></div>
                <div id="unity-fullscreen-button"></div>
                <div id="unity-build-title">NeoXonline</div>
            </div>
        </div>
    );
};

export default Unity;
