import { UploadApiResp } from '/@/api/sys/model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode, UploadFileParams } from '/#/axios';
import { BaseDataResp, BaseIDReq, BaseListReq, BaseResp } from '../model/baseModel';
import { FileListResp, updateFileInfoReq } from './model/fileModel';
import { AxiosProgressEvent } from 'axios';

enum Api {
  uploadFile = '/fms-api/upload',
  GetFileList = '/fms-api/file/list',
  UpdateFileInfo = '/fms-api/file',
  SetFileStatus = '/fms-api/file/status',
  DownloadFile = '/fms-api/file/download',
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<BaseDataResp<UploadApiResp>>(
    {
      url: Api.uploadFile,
      onUploadProgress,
    },
    params,
  );
}

/**
 * @description: Get file list
 */

export const getFileList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<FileListResp>>({ url: Api.GetFileList, params });
};

/**
 *  author: ryan
 *  @description: update file info
 */
export const UpdateFileInfo = (params: updateFileInfoReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateFileInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteFile = (params: BaseIDReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.UpdateFileInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set file's status
 */
export const setFileStatus = (id: number, status: number, mode: ErrorMessageMode = 'notice') =>
  defHttp.post(
    { url: Api.SetFileStatus, params: { id, status } },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );

/**
 *  author: Ryan Su
 *  @description: download file
 */

export const downloadFile = (id: number, mode: ErrorMessageMode = 'none') =>
  defHttp.get(
    {
      url: Api.DownloadFile + '/' + id,
      responseType: 'blob',
    },
    { errorMessageMode: mode },
  );
