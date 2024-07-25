import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
  render(
    <Carousel/>
  );
});

//snapshot test
it('matches Carousel snapshot', () => {
  const photos = [{ src: 'photo1.jpg', caption: 'Photo 1' }, { src: 'photo2.jpg', caption: 'Photo 2' }];
  const { asFragment } = render(<Carousel photos={photos} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
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

it('moves to the previous image when the left arrow is clicked', () => {
  const photos = [{ src: 'test1.com', caption: 'testing image 1' }, { src: 'test2.com', caption: 'testing image 2' }];
  const { getByText, getByRole } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Move to the second image
  const rightArrow = getByRole('button', { name: /right arrow/i });
  fireEvent.click(rightArrow);

  // Check that the second image is displayed
  expect(getByText('Image 2 of 2.')).toBeInTheDocument();

  // Click the left arrow to move back to the first image
  const leftArrow = getByRole('button', { name: /left arrow/i });
  fireEvent.click(leftArrow);

  // Check that the first image is displayed
  expect(getByText('Image 1 of 2.')).toBeInTheDocument();
});

it('hides the left arrow on the first image and the right arrow on the last image', () => {
  const photos = [{ src: 'test1.com', caption: 'testing image 1' }, { src: 'test2.com', caption: 'testing image 2' }];
  const { getByLabelText, queryByLabelText } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Check that the left arrow is hidden on the first image
  expect(queryByLabelText('left arrow')).not.toBeInTheDocument();

  // Move to the second image
  const rightArrow = getByLabelText('right arrow');
  fireEvent.click(rightArrow);

  // Check that the right arrow is hidden on the last image
  expect(queryByLabelText('right arrow')).not.toBeInTheDocument();
});

