import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it('renders without crashing', function() {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
});

it("matches snapshot", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("hides the left arrow if on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // check that the left arrow is not visible on the first card
  let leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).not.toBeInTheDocument()

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);
  // check that the left arrow is now visible
  leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);
  expect(leftArrow).toBeInTheDocument();
});

it("hides the right arrow if on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);
  expect(rightArrow).toBeInTheDocument();

  // check that the right arrow is not visible on the last card
  fireEvent.click(rightArrow);
  expect(rightArrow).not.toBeInTheDocument();
});
