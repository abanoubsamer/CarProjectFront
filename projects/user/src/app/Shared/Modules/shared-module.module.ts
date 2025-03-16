import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const Modules = [CommonModule];

@NgModule({
  declarations: [],
  imports: [Modules],
  exports: [...Modules],
})
export class SharedModuleModule {}
