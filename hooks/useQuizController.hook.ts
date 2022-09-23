import {QuizesTypes} from "../interfaces/quizes.interface";
import {useState} from "react";

export const useQuizAnswerController = (
	type: QuizesTypes,
	userId: string | null,
	variants?: any[]
) => {
	switch (type) {
		case QuizesTypes.SA: {
			const state = useState<string>(null);
			return new QuizSAAnswerController(userId, { variants, state });
		}
		case QuizesTypes.TA: return new QuizTAAnswerController(userId);
		case QuizesTypes.RA: return new QuizRAAnswerController(userId);
		case QuizesTypes.AB: return new QuizABAnswerController(userId, variants);
	}
}

class QuizSAAnswerController {
	variants: any[];
	selected: string;
	setSelected: (ans: string) => void;
	userId: string | null;

	constructor(userId: string | null, data: any) {
		this.variants = data.variants;
		this.selected = data.state[0];
		this.setSelected = data.state[1];
		this.userId = userId;
	}

	showAnswer() {
		const chosen = this.variants.find(variant => variant.id === this.selected) as any;
		return `Your answer is ${chosen.answer}`;
	}

	getAnswer() {
		return {
			...this.variants.find(variant => variant.id === this.selected),
			userId: this.userId
		}
	}

	setAnswer(id: string) {
		this.setSelected(id);
	}

	get() {
		return {
			setAnswer: this.setAnswer,
			getAnswer: this.getAnswer,
			showAnswer: this.showAnswer
		};
	}
}

class QuizTAAnswerController {
	message: string;
	userId: string | null;

	constructor(userId: string | null) {
		this.userId = userId;
	}

	showAnswer() {}

	setAnswer(message) {
		this.message = message;
	}

	getAnswer(userId: string) {
		return {
			message: this.message,
			userId: this.userId,
		};
	}

	get() {
		return {
			setAnswer: this.setAnswer,
			getAnswer: this.getAnswer,
			showAnswer: this.showAnswer
		};
	}
}

class QuizRAAnswerController {
	rating: number;
	scale: number;
	userId: string | null;

	constructor(userId: string | null) {
		this.userId = userId;
	}

	showAnswer() {
		return `Your answer is ${this.rating} of ${this.scale}`;
	}

	setAnswer(rating, scale) {
		this.rating = rating;
		this.scale = scale;
	}

	getAnswer() {
		return {
			rate: {
				rating: this.rating,
				scale: this.scale
			},
			userId: this.userId
		};
	}

	get() {
		return {
			setAnswer: this.setAnswer,
			getAnswer: this.getAnswer,
			showAnswer: this.showAnswer
		};
	}
}

class QuizABAnswerController extends QuizSAAnswerController {
	constructor(userId: string | null, variants: any[]) {
		super(userId, variants);
	}

	showAnswer() {
		const index = this.variants.findIndex(variant => variant === this.selected);
		const order = index ? 'second' : 'first';
		return `Your chose the ${order} variant`;
	}
}