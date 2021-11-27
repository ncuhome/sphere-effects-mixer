import * as THREE from 'three'
import { EffectComposer, DepthOfField, Noise, Glitch, Vignette, Pixelation, Scanline } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { useControls } from "leva";

export const Effects = () => {
    const {
        depthOfFieldActive,
        focusDistance,
        focalLength,
        bokehScale,
        height,
    } = useControls(
        "DepthOfField",
        {
            depthOfFieldActive: {
                value: true,
                label: "active"
            },
            focusDistance: {
                min: 0,
                max: 4,
                value: 2
            },
            focalLength: {
                min: 0,
                max: 1,
                value: 0.1
            },
            bokehScale: {
                min: 0,
                max: 10,
                value: 2
            },
            height: {
                min: 0,
                max: 1000,
                value: 480
            },
        },
        {
            collapsed: true
        }
    );
    const {
        vignetteActive,
        offset,
        darkness,
    } = useControls(
        "Vignette",
        {
            vignetteActive: {
                value: true,
                label: 'active'
            },
            offset: {
                min: 0,
                max: 5,
                value: 0.1
            },
            darkness: {
                min: 0,
                max: 5,
                value: 1.3
            },
        },
        {
            collapsed: true
        }
    );
    const { noiseActive, opacity, noiseBlend } = useControls(
        "Noise",
        {
            noiseActive: {
                value: true,
                label: 'active',
            },
            opacity: {
                value: 0.1,
                min: 0,
                max: 1,
            },
            noiseBlend: {
                value: BlendFunction.ADD,
                options: BlendFunction,
                label: 'blend'
            }
        },
        {
            collapsed: true
        }
    )
    const { scanlineActive, density, scanlineBlend } = useControls(
        "Scanline",
        {
            scanlineActive: {
                value: true,
                label: 'active'
            },
            density: {
                value: 1.25,
                min: 0,
                max: 10
            },
            scanlineBlend: {
                value: BlendFunction.REFLECT,
                options: BlendFunction,
                label: 'blend'
            }
        },
        {
            collapsed: true
        }
    )
    const { pixelationActive, granularity } = useControls(
        "Pixelation",

        {
            pixelationActive: {
                value: true,
                label: 'active'
            },
            granularity: {
                value: 5,
                min: 0,
                max: 100,
            }
        },
        {
            collapsed: true
        }
    )
    const { glitchActive, ratio, delay, glitchMode } = useControls(
        "Glitch",
        {
            glitchActive: {
                value: true,
                label: 'active'
            },
            ratio: {
                value: 1.0,
                min: 0,
                max: 100
            },
            delay: {
                value: {
                    min: 1.5,
                    max: 3.5
                }
            },
            glitchMode: {
                value: GlitchMode.SPORADIC,
                options: GlitchMode
            }
        },
        {
            collapsed: true
        }
    )
    return (
        <EffectComposer>
            {depthOfFieldActive &&
                <DepthOfField
                    focusDistance={focusDistance}
                    focalLength={focalLength}
                    bokehScale={bokehScale}
                    height={height}
                />
            }
            {vignetteActive &&
                <Vignette
                    eskil={false}
                    offset={offset}
                    darkness={darkness}
                />
            }
            {noiseActive &&
                <Noise
                    opacity={opacity}
                    premultiply
                    blendFunction={noiseBlend}
                />
            }
            {scanlineActive &&
                <Scanline
                    blendFunction={scanlineBlend}
                    density={density}
                />
            }
            {pixelationActive &&
                <Pixelation
                    granularity={granularity}
                />
            }
            <Glitch
                mode={glitchMode}
                active={glitchActive}
                ratio={ratio}
                delay={new THREE.Vector2(delay.min, delay.max)}
            />
        </EffectComposer>
    )
}
