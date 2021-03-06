import * as React from "react";
import { Editor } from "slate-react";

export type OnChangeFunc = (value: any) => void;
export type RenderNodeFunc = (props: any) => any;

export interface EditorProps {
    value: any;
    onChange: OnChangeFunc;
    renderNode: RenderNodeFunc;
}

export interface EditorState {
  value?: any;
}

export class CivilEditor extends React.Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public onChange = ({ value }: { value: any; }): void => {
      this.setState({
        value,
      });
      this.props.onChange(value);
    }

    public render(): any {
        return (
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            renderNode={this.props.renderNode}
          />
        );
    }
}
