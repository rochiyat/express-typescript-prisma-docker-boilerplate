export class DemoService {
  async getDataDemo() {
    return { message: 'Hello from Demo Service!' };
  }

  async getDataDemoById(id: string) {
    return { message: `Hello from Demo Service ${id}!` };
  }
}

export const demoService = new DemoService();
