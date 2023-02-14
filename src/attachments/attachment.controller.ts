import { Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as  fs from 'fs';
import { join } from 'path';
import { Express, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AttachmentController {
  private readonly filesFolder = this.config.get('FILES_FOLDER');
  constructor(
    private readonly logger: Logger, private readonly config: ConfigService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('attachment'))
  async uploadFile( @UploadedFile() attachment?: Express.Multer.File) {
    return await this.getFileList();
  }

  @Get('files')
  async getFiles(): Promise<string[]> {
    this.logger.log('AttachmentController::getFiles');
    return await this.getFileList();
  }

  @Get('file/:name')
  async downloadFile(@Res() res, @Param('name') fileName) {
    try{
      const file = fs.createReadStream(join(this.filesFolder, fileName));
      res.set({
        'Content-Disposition': `attachment; filename="${fileName}"`,
      });
      return (file).pipe(res);
   } catch(ex) {
      this.logger.error('failed to download file...');
   }
  }

  private async getFileList() {
    try {
      const files = await fs.readdirSync(this.filesFolder);
      const fileNames= [];
      files.forEach(file => { fileNames.push({name: file})})
      return fileNames;;
    } catch(ex) {
      this.logger.error('failed to get files');
      throw ex;
    }
  
  }
}
