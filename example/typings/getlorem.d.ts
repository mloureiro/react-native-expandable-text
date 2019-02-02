declare module 'getlorem' {
	export function bytes(
		count: number,
		tags?: string,
		swl?: boolean,
		array?: boolean,
	): string | Array<string>

	export function bytesArray(
		count: number,
		tags?: string,
		swl?: boolean,
	): Array<string>

	export function kill(): void

	export function list(tags?: string): string

	export function lists(
		count: number,
		tags?: string,
		swl?: boolean,
		array?: boolean,
	): string | Array<string>

	export function listsArray(
		count: number,
		tags?: string,
		swl?: boolean,
	): Array<string>

	export function paragraph(tags?: string): string | Array<string>

	export function paragraphs(
		count: number,
		tags?: string,
		swl?: boolean,
		array?: boolean,
	): string | Array<string>

	export function paragraphsArray(
		count: number,
		tags?: string,
		swl?: boolean,
	): Array<string>

	export function sentence(tags?: string, swl?: boolean): string

	export function sentences(
		count: number,
		tags?: string,
		swl?: boolean,
		array?: boolean,
	): string | Array<string>

	export function sentencesArray(
		count: number,
		tags?: string,
		swl?: boolean,
	): Array<string>

	export function word(tags?: string): string

	export function words(
		count: number,
		tags?: string,
		swl?: boolean,
		array?: boolean,
	): string | Array<string>

	export function wordsArray(
		count: number,
		tags?: string,
		swl?: boolean,
	): Array<string>
}
