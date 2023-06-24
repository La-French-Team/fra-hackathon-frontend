import React, { PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { rowHeight } from './constants';


export default class FlameGraph extends PureComponent {
  // Select the root node by default.
  state = {
    focusedNode: this.props.data.nodes[this.props.data.root],
  };

  // Shared context between the App and individual List item renderers.
  // Memoize this wrapper object to avoid breaking PureComponent's sCU.
  // Attach the memoized function to the instance,
  // So that multiple instances will maintain their own memoized cache.
  getItemData = memoize(
    (
      data,
      disableDefaultTooltips,
      focusedNode,
      focusNode,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseMove,
      width
    ) =>
      ({
        data,
        disableDefaultTooltips,
        focusedNode,
        focusNode,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseMove,
        scale: value => (value / focusedNode.width) * width,
      })
  );

  focusNode = (uid) => {
    const { nodes } = this.props.data;
    const chartNode = nodes[uid];
    this.setState(
      {
        focusedNode: chartNode,
      },
      () => {
        const { onChange } = this.props;
        if (typeof onChange === 'function') {
          onChange(chartNode, uid);
        }
      }
    );
  };

  handleMouseEnter = (event, rawData) => {
    const { onMouseOver } = this.props;
    if (typeof onMouseOver === 'function') {
      onMouseOver(event, rawData);
    }
  };

  handleMouseLeave = (event, rawData) => {
    const { onMouseOut } = this.props;
    if (typeof onMouseOut === 'function') {
      onMouseOut(event, rawData);
    }
  };

  handleMouseMove = (event, rawData) => {
    const { onMouseMove } = this.props;
    if (typeof onMouseMove === 'function') {
      onMouseMove(event, rawData);
    }
  };

  render() {
    const { data, disableDefaultTooltips, height, width } = this.props;
    const { focusedNode } = this.state;

    const itemData = this.getItemData(
      data,
      !!disableDefaultTooltips,
      focusedNode,
      this.focusNode,
      this.handleMouseEnter,
      this.handleMouseLeave,
      this.handleMouseMove,
      width
    );

    return (
      <List
        height={height}
        innerTagName="svg"
        itemCount={data.height}
        itemData={itemData}
        itemSize={rowHeight}
        width={width}
      >
        {ItemRenderer}
      </List>
    );
  }
}
