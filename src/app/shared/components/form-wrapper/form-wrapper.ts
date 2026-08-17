import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-wrapper',
  imports: [],
  templateUrl: './form-wrapper.html',
  styleUrl: './form-wrapper.scss',
})
export class FormWrapper {
  title = input.required<string>();
}
