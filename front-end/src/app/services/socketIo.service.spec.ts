import { TestBed, inject } from '@angular/core/testing';

import { SocketIoService } from './socketIo.service';

describe('SocketIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketIoService]
    });
  });

  it('should be created', inject([SocketIoService], (service: SocketIoService) => {
    expect(service).toBeTruthy();
  }));
});
