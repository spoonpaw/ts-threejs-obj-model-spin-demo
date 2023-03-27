import * as THREE from "three";
import { ModelLoader } from "../utils/modelLoader";

export default class ModelScene extends THREE.Scene {
	private modelLoader = new ModelLoader();
	private model?: THREE.Group;
	private elapsedTime = 0;
	private backgroundColors = [
		new THREE.Color(0xB0F4AC), // Pastel green
		new THREE.Color(0xF4B0D1), // Pastel pink
		new THREE.Color(0xB0D3F4), // Pastel blue
	];


	async initialize() {
		this.background = new THREE.Color(0xffffff);

		this.model = await this.modelLoader.loadModel();
		this.model.position.set(0, -0.2, -20);

		this.add(this.model);

		// Use only an ambient light for simple global illumination
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.add(ambientLight);
	}

	update() {
		// Update the model's rotation
		if (this.model) {
			this.modelLoader.updateModelRotation(this.model);
		}

		// Update background color
		this.updateBackgroundColor();
	}

	private updateBackgroundColor() {
		this.elapsedTime += 0.01;
		const colorIdx = Math.floor(this.elapsedTime) % this.backgroundColors.length;
		const nextColorIdx = (colorIdx + 1) % this.backgroundColors.length;
		const color = this.backgroundColors[colorIdx].clone().lerp(this.backgroundColors[nextColorIdx], this.elapsedTime % 1);
		(this.background as THREE.Color).copy(color as THREE.Color);

	}
}
