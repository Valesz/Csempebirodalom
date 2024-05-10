import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Output() nameEmitter = new EventEmitter<string | null>();
  @Input() filteredOptions?: Observable<Array<string>>;
  
  nameFilter = new FormControl('')

  ngOnInit(): void {
    this.nameFilter.valueChanges.subscribe(
      next => {
        this.nameEmitter.emit(next)
      }
    )
  }

  emptyValueHandle() {
    this.nameEmitter.emit(this.nameFilter.value);
  }
}
