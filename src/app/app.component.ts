import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject,Observable, of as observableOf} from 'rxjs';

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hierarchic Tree';

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);
  constructor() {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        filename: "test1",
        type: "",
        children: [
          {
            filename: "test1.1",
            type: "",
            children: [
              {
                filename: "test1.1.1",
                type: "",
                children: [{
                  filename: "test1.1.1.1",
                  type: "",
                  children: [],
                },
                {
                  filename: "test1.1.1.2",
                  type: "",
                  children: [],
                }
              ],
             },
          ],
          }
          ],
        },
      {
        filename: "test2",
        type: "",
        children: [
          {
            filename: "test2.1",
            type: "",
            children: [],
          }
        ],
      },
      {
        filename: "test3",
        type: "",
        children: [
          {
            filename: "test3.1",
            type: "",
            children: [],
          }
        ],
      },

    ]);
  }



  hasNestedChild = (_: number, nodeData: FileNode) => {return !(nodeData.type); };

  private _getChildren = (node: FileNode) => { return observableOf(node.children); };
}
