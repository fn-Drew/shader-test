import React, { useEffect } from 'react'
import * as THREE from "three";
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Sparkles, Cloud } from '@react-three/drei'
import { NodeToyCullMode, NodeToyMaterial, NodeToyTick } from '@nodetoy/react-nodetoy'
import { data } from './shaderData.js'
import './App.css'

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
// sphereGeometry.computeTangents() // NEEDED if there is a normal map

const RendererSettings = () => {
    const { gl } = useThree();
    useEffect(() => {
        gl.outputEncoding = THREE.LinearEncoding;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = .9;
    }, []);
    return null;
};

export default function App() {
    return (
        <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}>
            <Environment preset='city' background blur={0} />
            <Cloud
                opacity={0.5}
                speed={0.4} // Rotation speed
                width={10} // Width of the full cloud
                depth={1.5} // Z-dir depth
                segments={20} // Number of particles
            />
            <Sparkles count={800} speed={1} color="white" size={1} noise={3} scale={10} />
            <RendererSettings />
            <mesh geometry={sphereGeometry}>
                <NodeToyMaterial data={data} />
            </mesh>
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <NodeToyTick />
            <OrbitControls />
        </Canvas>
    )
}



