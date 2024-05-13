const TYPE_FILES = ['jpeg', 'gif', 'jpg', 'png'];
const avatarInput = document.querySelector('.ad-form__field input[type="file"]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imgInput = document.querySelector('.ad-form__upload input[type="file"]');
const imgPreview = document.querySelector('.ad-form__photo');


const getAvatar = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = TYPE_FILES.some((it) => {
      return fileName.endsWith(it);
    })
    if (matches) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      })
    }
  })
}

const getImg = () => {
  imgInput.addEventListener('change', () => {
    const file = imgInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = TYPE_FILES.some((it) => {
      return fileName.endsWith(it);
    })
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const newImage = document.createElement('img');
        newImage.src = reader.result;
        imgPreview.appendChild(newImage);
      })
      reader.readAsDataURL(file);
    }
  })
}

getAvatar();
getImg();


export {getAvatar, getImg}
