const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

function generateImages(src, widths) {
	let source = path.join(__dirname, "_includes/", src);
	let options = {
		widths: widths,
		formats: ["jpeg"],
		outputDir: "./_site/static/img",
		urlPath: "static/img/",
		useCache: true,
		sharpJpegOptions: {
			quality: 99,
			progressive: true,
		},
	};
	// genrate images, ! dont wait
	eleventyImage(source, options);
	// get metadata even the image are not fully generated
	return eleventyImage.statsSync(source, options);
}

function syncShortcode(src, cls, alt, sizes, widths) {
	let options = {
		widths: widths,
		formats: ["jpeg"],
	};

	// generate images, while this is async we don’t wait
	eleventyImage(src, options);

	let imageAttributes = {
		class: cls,
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};
	// get metadata even if the images are not fully generated yet
	let metadata = Image.statsSync(src, options);
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = (eleventyConfig) => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addShortcode(
		"image",
		async function imageShortcode(src, alt, sizes, widths) {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			if (!widths) {
				widths = [600];
			}
			let formats = ["auto"];
			let file = relativeToInputPath(this.page.inputPath, src);
			let metadata = await eleventyImage(file, {
				// widths: widths || ["auto"],
				widths: widths,
				formats,
				outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			});

			// TODO loading=eager and fetchpriority=high
			let imageAttributes = {
				alt,
				sizes,
				loading: "eager",
				decoding: "async",
			};
			return eleventyImage.generateHTML(metadata, imageAttributes);
		}
	);
};
