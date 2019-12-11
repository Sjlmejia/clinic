import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AttendsService } from '../attends.service';

@Component({
  selector: 'app-attend-create',
  templateUrl: './attend-create.component.html',
  styleUrls: ['./attend-create.component.sass']
})
export class AttendCreateComponent implements OnInit {
  private id: string;
  form: FormGroup;
  isLoading = false;
  items = [];
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
    console.log('event', this.items, index);
  }
  addItem() {
    this.items.push({name: '', description: ''});
  }
}
