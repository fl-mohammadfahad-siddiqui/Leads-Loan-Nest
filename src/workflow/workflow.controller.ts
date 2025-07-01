import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload.middleware';
// import { WorkflowContext } from './workflow.context';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get('config')
  getAllWorkflows() {
    return this.workflowService.getAllWorkflows();
  }

  @Post('config')
  saveWorkflow(@Body() body: { name: string; steps: string[] }) {
    return this.workflowService.saveWorkflow(body.name, body.steps);
  }

  @Delete('config/:name')
  deleteWorkflow(@Param('name') name: string) {
    return this.workflowService.deleteWorkflow(name);
  }

  @Post('execute/:name')
  @UseInterceptors(FilesInterceptor('documents', undefined, multerOptions))
  async executeWorkflow(
    @Param('name') name: string,
    @UploadedFiles() documents: Express.Multer.File[],
    @Body() body: any,
  ): Promise<{ message: string; lead_id?: number; loan_id?: number }> {
    let input: any;

    if (typeof body.data === 'string') {
      input = JSON.parse(body.data);
    } else {
      input = body.data || {};
    }

    input.documents = documents;

    const result = await this.workflowService.executeWorkflow(name, input);
    return {
      message: 'Lead created',
      lead_id: result.lead?.lead_id,
      loan_id: result.loan?.loan_id,
    };
  }


}
