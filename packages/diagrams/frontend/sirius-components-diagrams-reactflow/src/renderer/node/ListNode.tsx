/*******************************************************************************
 * Copyright (c) 2023 Obeo and others.
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Obeo - initial API and implementation
 *******************************************************************************/

import { Theme, useTheme } from '@material-ui/core/styles';
import { memo } from 'react';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';
import { Label } from '../Label';
import { useDrop } from '../drop/useDrop';
import { NodePalette } from '../palette/NodePalette';
import { ListNodeData } from './ListNode.types';

const listNodeStyle = (
  theme: Theme,
  style: React.CSSProperties,
  selected: boolean,
  faded: boolean
): React.CSSProperties => {
  const listNodeStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    opacity: faded ? '0.4' : '',
    ...style,
  };
  if (selected) {
    listNodeStyle.outline = `${theme.palette.primary.main} solid 1px`;
  }

  return listNodeStyle;
};

export const ListNode = memo(({ data, isConnectable, id, selected }: NodeProps<ListNodeData>) => {
  const theme = useTheme();
  const { onDrop, onDragOver } = useDrop();

  const handleOnDrop = (event: React.DragEvent) => {
    onDrop(event, id);
  };

  return (
    <>
      <NodeResizer color={theme.palette.primary.main} isVisible={selected} />
      <div
        style={listNodeStyle(theme, data.style, selected, data.faded)}
        onDragOver={onDragOver}
        onDrop={handleOnDrop}
        data-testid={`Rectangle - ${data?.label?.text}`}>
        {data.label ? <Label label={data.label} faded={data.faded} transform="" /> : null}
        <div>
          {data.listItems.map((listItem) => {
            return (
              <div key={listItem.id} style={listItem.style}>
                {listItem.label.text}
              </div>
            );
          })}
        </div>
        {selected ? <NodePalette diagramElementId={id} labelId={data.label?.id ?? null} /> : null}
        <Handle id="top" type="source" position={Position.Top} isConnectable={isConnectable} />
        <Handle id="right" type="source" position={Position.Right} isConnectable={isConnectable} />
        <Handle id="bottom" type="source" position={Position.Bottom} isConnectable={isConnectable} />
        <Handle id="left" type="source" position={Position.Left} isConnectable={isConnectable} />
      </div>
    </>
  );
});
