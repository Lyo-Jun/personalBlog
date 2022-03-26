import {Component, OnInit} from '@angular/core';
import {TagManagerService} from "../../services/tag-manager.service";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {ITag} from "../../../../interfaces/Itag";

@Component({
  selector: 'app-tag-manager',
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss']
})
export class TagManagerComponent implements OnInit {
  constructor(private tagManager: TagManagerService) {
  }

  refresher$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  tags$: Observable<ITag[]>;
  tagToAdd: string = '';


  ngOnInit(): void {
    this.tags$ = this.refresher$
      .pipe(
        switchMap(x => this.tagManager.getAll())
      );
  }

  refresh(): void {
    this.refresher$.next(false);
  }


  addTag(): void {
    this.tagToAdd = this.tagToAdd.trim();
    if (this.tagToAdd === '' || this.tagToAdd.length >= 30) {
      alert('输入的字符串不合法！');
      this.tagToAdd = '';
      return;
    }

    let confirmAdd = confirm(`你确定要添加标签\n${this.tagToAdd}\n吗？`);
    if (!confirmAdd)
      return;

    this.tagManager.AddOne(this.tagToAdd).subscribe(
      () => this.refresh()
    );

  }

  deleteTag(id: number, name: string): void {
    let confirmDelete = confirm(`你却要删除标签\n${name}\n吗？`);
    if (confirmDelete) {
      this.tagManager.deleteOne(id).subscribe(
        () => this.refresh()
      );
    }
  }

}
