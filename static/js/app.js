const wrapper = document.querySelector('.upload-wrapper');
const alertText = document.querySelector('.alert-text');
const cloud = document.querySelector('.cloud');
const cancelBtn = document.querySelector('.cancel-button');
const defaultBtn = document.querySelector('#default-button');
const chooseBtn = document.querySelector('.choose-button');
const userImage = document.querySelector('#user-image');
const fileName = document.querySelector('#filename');
const format = document.querySelector('#format');
const height = document.querySelector('#height');
const width = document.querySelector('#width');
const process = document.querySelector('#process');
let file = '';

const activeInput = () => {
  fileName.removeAttribute('disabled');
  width.removeAttribute('disabled');
  height.removeAttribute('disabled');
  process.removeAttribute('disabled');
  fileName.setAttribute('placeholder', 'File Name');
  width.setAttribute('placeholder', 'Width');
  height.setAttribute('placeholder', 'Height');
  wrapper.classList.add('active');
  fileName.classList.add('active');
  width.classList.add('active');
  height.classList.add('active');
  cancelBtn.classList.add('active');
  userImage.classList.add('active');
};

function disableInput() {
  fileName.setAttribute('disabled', 'true');
  width.setAttribute('disabled', 'true');
  height.setAttribute('disabled', 'true');
  process.setAttribute('disabled', 'true');
  fileName.setAttribute('placeholder', '');
  width.setAttribute('placeholder', '');
  height.setAttribute('placeholder', '');
  wrapper.classList.remove('active');
  fileName.classList.remove('active');
  width.classList.remove('active');
  height.classList.remove('active');
  wrapper.classList.remove('active');
  userImage.classList.remove('active');
  userImage.src = '';
  fileName.value = '';
}

function showImage(file) {
  let fileType = file.type;
  let extensions = ['image/png', 'image/jpg', 'image/jpeg'];
  if (extensions.includes(fileType)) {
    let reader = new FileReader();
    reader.onload = function () {
      userImage.src = reader.result;
    };
    reader.readAsDataURL(file);
    activeInput();
    wrapper.classList.remove('alert', 'dragover');
    cloud.classList.remove('alert');
    alertText.innerHTML = 'Drag & Drop <br>OR';
    let fileEx = file.name;
    fileName.value = fileEx.slice(0, fileEx.length - 4);
    if (fileType === 'image/jpeg') {
      format.value = 'jpg';
    } else {
      format.value = fileType.split('/')[1];
    }
    cancelBtn.addEventListener('click', () => {
      disableInput();
    });
  } else {
    wrapper.classList.add('alert');
    cloud.classList.add('alert');
    alertText.textContent = 'This is not an image file';
  }
}

// To click on upload image from custom button
chooseBtn.addEventListener('click', () => {
  defaultBtn.click();
});

// To upload image by button
defaultBtn.addEventListener('change', () => {
  file = defaultBtn.files[0];
  showImage(file);
});

// To upload image by drop
wrapper.addEventListener('drop', (event) => {
  event.preventDefault();
  event.stopPropagation();
  // file = event.dataTransfer.files[0];
  defaultBtn.files = event.dataTransfer.files;
  file = defaultBtn.files[0];
  showImage(file);
});

wrapper.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.stopPropagation();
  wrapper.classList.add('dragover');
  alertText.innerHTML = 'Release To upload image';
});

wrapper.addEventListener('dragleave', () => {
  wrapper.classList.remove('active');
  wrapper.classList.remove('dragover');
  alertText.innerHTML = 'Drag & Drop <br>OR';
});
