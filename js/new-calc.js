const DEFAULT_HEIGHT = 875; // default height
const DEFAULT_WIDTH = 500; // default width
const DEFAULT_FONT_SIZE = 10;



// resets dimension to its default
const resetDimension = (element) => {
    element.style.height = `${DEFAULT_HEIGHT}px`;
    element.style.width = `${DEFAULT_WIDTH}px`;
}

// updates text data
const updateTextData = (element, infoContainer) => {
    const printData = `${element.offsetWidth} x ${element.offsetHeight} => ${roundToTwo(element.offsetHeight / element.offsetWidth)}`;
    infoContainer ? infoContainer.innerHTML = printData : element.innerHTML = printData
    /* element.innerHTML = printData; */
}

// gets computed dimensions
const getComputedDimensions = (element) => {
    const style = getComputedStyle(element);
    const width = +(style['width'].split('px')[0]) || null;
    const height = +(style['height'].split('px')[0]) || null;
    return { width, height }
}

// gets dimensions and ratio
const getDimensionsAndScale = (element, parent = null) => {
    const { width, height } = getComputedDimensions(element);
    const { width: parentWidth = DEFAULT_WIDTH, height: parentHeight = DEFAULT_HEIGHT } = getComputedDimensions(parent);
    return { width, height, parentWidth, parentHeight, scale: Math.min((parentWidth / width), (parentHeight / height)) };
};

// scales element
const scaleElement = (element, scale) => {
    const { width, height } = getComputedDimensions(element);
    element.style.height = `${height * scale}px`;
    element.style.width = `${width * scale}px`;
};

const setFontSize = (newFontSize) => {
    const root = document.querySelector(':root');
    root.style.fontSize = `${newFontSize}px`;
};

const roundToTwo = (num) => {
    return +(Math.round(num + "e+3") + "e-3");
};

// the resize event handler
const resizeHandler = () => {
    const centeredElement = document.getElementById('centered');
    const parentElement = document.getElementById('centered-wrapper');
    const infoContainer = document.getElementById('external');

    const { height, parentWidth, parentHeight, scale } = getDimensionsAndScale(centeredElement, parentElement);

    if (DEFAULT_HEIGHT > parentHeight || DEFAULT_WIDTH > parentWidth) {
        console.log('here');
        scaleElement(centeredElement, scale);
        setFontSize(DEFAULT_FONT_SIZE * (height / DEFAULT_HEIGHT));
    } else {
        console.log('there');
        resetDimension(centeredElement);
        setFontSize(DEFAULT_FONT_SIZE)
    }
    updateTextData(centeredElement, infoContainer);
}

window.onload = () => {
    resizeHandler();
};

window.onresize = resizeHandler;