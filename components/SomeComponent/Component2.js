// @flow
import * as React from "react";
import { connect } from "react-redux";
import type { Dispatch } from "redux";

export type RadioPanelProps = { active: boolean };

type ReduxState = { lol: number };

type StateProps = {|
  enabled: boolean
|};

type OwnProps = {|
  prop?: string,
  children?: React.Element<any>
|};

type Props = {|
  ...StateProps,
  ...OwnProps,
  dispatch: Dispatch<*>
|};

const Gate = ({ enabled, children }: Props) =>
  enabled ? React.Children.only(children) : null;

const mapAccountStateToProps = (
  state: ReduxState,
  props: OwnProps
): StateProps => ({
  enabled: true
});

export const Show = connect<Props, OwnProps, _, _, _, _>(
  mapAccountStateToProps
)(Gate);

class RadioPanel extends React.PureComponent<RadioPanelProps> {
  render() {
    return <div />;
  }
}

class RadioPanelGroup extends React.PureComponent<{
  children: React.ChildrenArray<React.Element<typeof RadioPanel>>
}> {
  render() {
    const { children } = this.props;

    return React.Children.map(children, child =>
        React.cloneElement(child, {
          active: true
        })
      )
  }
}

const Component2 = ({  }: {}) => (
  <RadioPanelGroup>
    <Show prop="prop">
      <div />
    </Show>
  </RadioPanelGroup>
);

export default Component2;
