import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-select-tag',
    templateUrl: './select-tag.component.html',
    styleUrls: ['./select-tag.component.less'],
})
export class SelectTagComponent implements OnInit {
    @ViewChild('tagInput')
    tagInput!: ElementRef<HTMLInputElement>;
    @ViewChild('auto')
    matAutocomplete!: MatAutocomplete;
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl();
    filteredTags!: Observable<string[]>;
    tags: string[] = [];
    allTags: string[] = [];

    constructor(private dataService: DataService) {
        this.dataService.getTags().subscribe((res) => {
            this.allTags = res.data.tags.map((tag) => tag.name);
            console.log(this.allTags);
            this.filteredTags = this.tagCtrl.valueChanges.pipe(
                startWith(null),
                map((tag: string | null) =>
                    tag ? this.filterTag(tag) : this.allTags.slice()
                )
            );
        });
    }
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        // this.dataService.getTags().subscribe((res) => {
        //     this.allTags = res.data.tags.map((tag) => tag.name);
        //     console.log(this.allTags);
        // });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our tag
        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.tagCtrl.setValue(null);
    }

    remove(tag: string): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        // console.log(event.option.viewValue);
        this.tags.push(event.option.viewValue);
        this.dataService.selectedTags = this.tags;
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }

    private filterTag(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allTags.filter(
            (tag) => tag.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
