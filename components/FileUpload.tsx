'use client';

import {useTranslations} from 'next-intl';
import { useState } from 'react';
import { Input } from '@nextui-org/input';

const FileUpload = () => {
  const t = useTranslations('File');
  const [selectedFileName, setSelectedFileName] = useState(t('no_file_selected'));

  const handleFileChange = (event:any) => {
    if (event.target.files.length > 0) {
      setSelectedFileName(event.target.files[0].name);
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-file-label font-medium text-sm">
        {t('add_file')} <span>({selectedFileName})</span>
      </label>
      <Input 
        id="file-upload"
        type="file" 
        onChange={handleFileChange}
        className='file-input'
      />
      
    </div>
    
  );
};

export default FileUpload;
