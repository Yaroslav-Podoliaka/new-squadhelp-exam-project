import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
// Компонент ImageUpload, использует Formik для работы с полем файла
const ImageUpload = (props) => {
  // Получаем поле, мета-информацию и вспомогательные методы из Formik
  const [field, , helpers] = useField(props.name);
  // Получаем поле, мета-информацию и вспомогательные методы из Formik
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  // Обработчик события изменения файла
  const onChange = (event) => {
    // Получаем элемент изображения
    const node = window.document.getElementById('imagePreview');
    // Получаем файл из события
    const file = event.target.files?.[0];

    if (file) {
      // Устанавливаем значение поля в Formik с помощью вспомогательного метода
      helpers.setValue(file);
      // Создаем объект FileReader для чтения содержимого файла в base64
      const reader = new FileReader();
      // Устанавливаем обработчик события onload, который срабатывает при загрузке файла
      reader.onload = () => {
        // Устанавливаем src изображения равным содержимому файла в base64
        node.src = reader.result;
      };
        // Читаем содержимое файла в base64
        reader.readAsDataURL(file);
      }
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        {/* Вывод информации о поддерживаемых типах файлов */}
        <span>Support only images (*.png, *.gif, *.jpg, *.jpeg)</span>
        {/* Ввод файла, при изменении которого срабатывает обработчик onChange */}
        <input
          id="fileInput"
          type="file"
          name='avatar'
          accept=".png, .gif, .jpg, .jpeg"
          onChange={onChange}
        />
        {/* Метка для стилизации стандартного элемента input */}
        <label htmlFor="fileInput">Chose file</label>
      </div>
      {/* Изображение, отображающее превью выбранного файла */}
      <img
        id="imagePreview"
        className={classNames({ [imgStyle]: !!field.value })}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;

// import React from 'react';
// import classNames from 'classnames';
// import { useField } from 'formik';

// const ImageUpload = (props) => {
//   const [field] = useField(props.name);
//   const { uploadContainer, inputContainer, imgStyle } = props.classes;

//   const onChange = (event) => {
//     const node = window.document.getElementById('imagePreview');
//     const files = event.target.files;

//     if (files && files.length > 0) {
//       const file = files[0];
//       const imageType = /image.*/;

//       if (!field || !file.type.match(imageType)) {
//         event.target.value = '';
//       } else {
//         field.onChange(file);
//         const reader = new FileReader();
//         reader.onload = () => {
//           node.src = reader.result;
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };
//   return (
//     <div className={uploadContainer}>
//       <div className={inputContainer}>
//         <span>Support only images (*.png, *.gif, *.jpg, *.jpeg)</span>
//         <input
//           {...field}
//           id="fileInput"
//           type="file"
//           accept=".png, .gif, .jpg, .jpeg"
//           onChange={onChange}
//         />
//         <label htmlFor="fileInput">Chose file</label>
//       </div>
//       <img
//         id="imagePreview"
//         className={classNames({ [imgStyle]: !!field?.value })}
//         alt="user"
//       />
//     </div>
//   );
// };

// export default ImageUpload;

// import React from 'react';
// import classNames from 'classnames';
// import { useField } from 'formik';
// // Компонент ImageUpload, который использует Formik для работы с полем файла
// const ImageUpload = (props) => {
//   const [field, /**meta, helpers**/] = useField(props.name);
//   const { uploadContainer, inputContainer, imgStyle } = props.classes;
//   const onChange = (event) => {
//     const node = window.document.getElementById('imagePreview');
//     const file = event.target.files[0];
//     const imageType = /image.*/;
//     if (!file.type.match(imageType)) {
//       event.target.value = '';
//     } else {
//       field.onChange(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         node.src = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   return (
//     <div className={uploadContainer}>
//       <div className={inputContainer}>
//         <span>Support only images (*.png, *.gif, *.jpg, *.jpeg)</span>
//         <input
//           {...field}
//           id='fileInput'
//           type='file'
//           accept='.png, .gif, .jpg, .jpeg'
//           onChange={onChange}
//         />
//         <label htmlFor='fileInput'>Chose file</label>
//       </div>
//       <img
//         id='imagePreview'
//         className={classNames({ [imgStyle]: !!field.value })}
//         alt='user'
//       />
//     </div>
//   );
// };

// export default ImageUpload;
