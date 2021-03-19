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
import { UtilService } from '../../services/util.service';

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
    tagControl = new FormControl();
    filteredTags!: Observable<string[]>;
    tags: string[] = [];
    allTags: string[] = [];

    constructor(
        private dataService: DataService,
        private utilService: UtilService
    ) {
        // this.allTags = this.dataService.tags.map((tag) => tag.name);
        // console.log(this.allTags);
        // this.filteredTags = this.tagControl.valueChanges.pipe(
        //     startWith(null),
        //     map((tag: string | null) =>
        //         tag ? this.filterTag(tag) : this.allTags.slice()
        //     )
        // );
        this.dataService.getTags().subscribe((res) => {
            this.allTags = res.data.tags.map((tag) => tag.name);
            // console.log(this.allTags);
            this.filteredTags = this.tagControl.valueChanges.pipe(
                startWith(null),
                map((tag: string | null) =>
                    tag ? this.filterTag(tag) : this.allTags.slice()
                )
            );
        });
        this.utilService.inspirationTag$.subscribe(
            (tags) => (this.tags = tags)
        );
    }
    ngOnInit(): void {}

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }
        if (input) {
            input.value = '';
        }
        this.tagControl.setValue(null);
    }

    remove(tag: string): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
            this.allTags.push(tag);
            // console.log(this.allTags);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tags.push(event.option.viewValue);
        this.allTags.splice(this.allTags.indexOf(event.option.viewValue), 1);
        // console.log(this.allTags);

        this.dataService.selectedTagIDs = this.tags
            .map(
                (tagName) =>
                    this.dataService.tags.filter(
                        (tag) => tag.name === tagName
                    )[0]
            )
            .map((tag) => tag.id)
            .join(',');
        this.tagInput.nativeElement.value = '';
        this.tagControl.setValue(null);
    }

    private filterTag(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allTags.filter(
            (tag) => tag.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
