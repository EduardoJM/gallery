import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export interface DropZoneProps {
  multiple?: boolean;
  validExtensions?: Array<string>;
  maxFileSize?: number;
  onConfirm: (files: Array<File>) => void;
  currentFile?: File | string | null;
}

export const Dropzone = ({
  multiple = false,
  validExtensions = [],
  maxFileSize = 5 * 1024 * 1024,
  onConfirm,
  currentFile,
}: DropZoneProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    console.log(acceptedFiles);
    if (!acceptedFiles.length) {
      return setError('Os arquivos selecionados não são válidos.');
    }
    const invalidFiles = acceptedFiles.filter((item) => {
      const ext = `.${item.name.split('.').pop()}`.toLowerCase();
      if (!validExtensions.includes(ext)) {
        return true;
      }
      return false;
    });
    if (invalidFiles.length > 0) {
      // TODO: change this.
      setError('Os arquivos selecionados não são válidos.');
      return;
    }
    onConfirm(acceptedFiles);
  }, [validExtensions, onConfirm]);

  const preview = useMemo(() => {
    if (!currentFile) {
      return null;
    }
    if (typeof currentFile === "string") {
      return currentFile;
    }
    return URL.createObjectURL(currentFile);
  }, [currentFile]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple,
    maxSize: maxFileSize,
  })

  return (
    <div className='flex flex-col items-stretch'>
      <div className='border border-dashed p-3 rounded-md active:border-primary' {...getRootProps()}>
        <input {...getInputProps()} />

        {isDragActive ? (
          <div className='h-[150px] flex flex-col items-center justify-center'>
            <p className='text-center'>Drop the files here ...</p>
          </div>
        ) : (
          <>
            {preview ? (
              <div className='flex h-[150px]'>
                <img className='object-cover aspect-square rounded-md' src={preview} />
              </div>
            ) : (
              <div className='h-[150px] flex flex-col items-center justify-center'>
                <p className='text-center'>Drag 'n' drop some files here, or click to select files</p>
              </div>
            )}
          </>
        )}
      </div>
      {!!error && (
        <>{error}</>
      )}
    </div>
  )
}

