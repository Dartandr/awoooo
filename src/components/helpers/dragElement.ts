let dragElement: HTMLElement;

let drag = false;

interface IObjectPos {
  x: number;
  y: number;
}

const startPos: IObjectPos = {
  x: 0,
  y: 0,
};
const objectPos: IObjectPos = {
  x: 0,
  y: 0,
};

const handleMousedown = (element: MouseEvent): void => {
  const pos = dragElement.getBoundingClientRect();
  drag = true;
  startPos.x = element.clientX;
  startPos.y = element.clientY;
  objectPos.x = pos.left;
  objectPos.y = pos.top;
  dragElement.style.transition = 'all 0ms';
};

const handleMouseup = (): void => {
  drag = false;
  dragElement.style.transition = '300ms ease';
};

const getPosition = (value: number): string => `${value}px`;

const handleMousemove = (element: MouseEvent): void => {
  const field: HTMLElement = document.getElementById('content');
  const topField: number = field.getBoundingClientRect().top;
  if (drag === true && dragElement !== null) {
    if (objectPos.x + (element.clientX - startPos.x) < 0) {
      dragElement.style.left = '0';
    } else if (
      objectPos.x + (element.clientX - startPos.x) + dragElement.offsetWidth >
      field.offsetWidth
    ) {
      dragElement.style.left = getPosition(
        field.offsetWidth - dragElement.offsetWidth,
      );
    } else {
      dragElement.style.left = getPosition(
        objectPos.x + (element.clientX - startPos.x),
      );
    }

    if (objectPos.y + (element.clientY - startPos.y - topField) < 0) {
      dragElement.style.top = '0';
    } else if (
      objectPos.y + (element.clientY - startPos.y) + dragElement.offsetHeight >
      field.offsetHeight+20
    ) {
      dragElement.style.top = getPosition(
        field.offsetHeight - dragElement.offsetHeight,
      );
    } else {
      dragElement.style.top = getPosition(
        objectPos.y + (element.clientY - startPos.y - topField),
      );
    }
  }
};

export const addDragListener = (handleElement: HTMLElement): void => {
  dragElement = handleElement;
  const field: HTMLElement = document.getElementById('content');
  handleElement.addEventListener('mousedown', handleMousedown);

  handleElement.addEventListener('mouseup', handleMouseup);

  field.addEventListener('mousemove', handleMousemove);
};

export const removeDragListener = (handleElement: HTMLElement): void => {
  const field: HTMLElement = document.getElementById('content');

  handleElement.removeEventListener('mousedown', handleMousedown);

  handleElement.removeEventListener('mouseup', handleMouseup);

  field.removeEventListener('mousemove', handleMousemove);
};
