'use client';

import {useTranslations} from 'next-intl';
import { Input } from "@heroui/input";
import { ErrorMessage } from 'formik';

type Props = {
  formik: any;
};

const FileUpload = ({ formik }: Props) => {
  const t = useTranslations('File');
  const file = formik.values.file;

  const handleChange = (event: any) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('file', file);
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-label font-medium text-sm">
        {t('add_file')} <span>({file?.name || t('no_file_selected')})</span>
      </label>
      <Input
        id="file-upload"
        name="file"
        type="file"
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={handleChange}
        className='file-input'
      />
      <div className="text-red-400 text-sm mt-2">
        <ErrorMessage name="file"/>
      </div>
    </div>
  );
};

export default FileUpload;
