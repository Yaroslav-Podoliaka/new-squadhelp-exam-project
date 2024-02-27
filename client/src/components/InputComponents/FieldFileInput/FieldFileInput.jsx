import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {({field, form}) => {
        const getFileName = () => {
          if (field.value) {
            return field.value.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer} /**enctype='multipart/form-data'**/>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              // {...field}
              className={fileInput}
              id='fileInput'
              type='file'
              onChange={(event) => {
                const selectedFile = event.target.files?.[0];
                form.setFieldValue(field.name, selectedFile);
              }}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;


// import React from 'react';
// import { Field } from 'formik';

// const FieldFileInput = ({ classes, ...rest }) => {
//   const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

//   return (
//     <Field name={rest.name}>
//       {props => {
//         const { field } = props;

//         const getFileName = () => {
//           if (props.field.value) {
//             return props.field.value.name;
//           }
//           return '';
//         };

//         return (
//           <div className={fileUploadContainer}>
//             <label htmlFor='fileInput' className={labelClass}>
//               Choose file
//             </label>
//             <span id='fileNameContainer' className={fileNameClass}>
//               {getFileName()}
//             </span>
//             <input
//               {...field}
//               className={fileInput}
//               id='fileInput'
//               type='file'
//             />
//           </div>
//         );
//       }}
//     </Field>
//   );
// };

// export default FieldFileInput;
