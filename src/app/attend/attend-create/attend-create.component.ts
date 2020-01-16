import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AttendsService } from '../attends.service';

@Component({
  selector: 'app-attend-create',
  templateUrl: './attend-create.component.html',
  styleUrls: ['./attend-create.component.sass'],
})
export class AttendCreateComponent implements OnInit {
  @HostBinding('class') class = 'create-attend';
  private id: string;
  form: FormGroup;
  isLoading = false;
  items = [];
  urls = new Array<string>();
  constructor(public route: ActivatedRoute, private attendsService: AttendsService) { }
  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      date: new FormControl(null, {})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
  }

  onImagePicked(event: any) {
    this.urls = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          console.log(this.urls);
        }
        reader.readAsDataURL(file);
      }
    }
  }
  onSaveAttend() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.attendsService.addAttend(this.form.value.description, this.form.value.date, this.id, this.items);

    this.form.reset();
  }
  test(e, type, index) {
    this.items[index][type] = e.target.value;
  }
  addItem() {
    this.items.push({name: '', description: ''});
  }
  addPhoto() {
    console.log('www');
  }
}
