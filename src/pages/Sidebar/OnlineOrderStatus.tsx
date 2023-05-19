import { Badge } from '@mantine/core';
import React from 'react';

export const OnlineOrderStatus: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'created') return <Badge color="red">created</Badge>;
  if (status === 'processing') return <Badge color="dark">processing</Badge>;
  if (status === 'confirm') return <Badge>confirm</Badge>;
  if (status === 'ready') return <Badge color="teal">confirm</Badge>;
  if (status === 'done') return <Badge color="lime">done</Badge>;
  if (status === 'cancel') return <Badge color="violet">cancel</Badge>;
  if (status === 'return') return <Badge color="orange">return</Badge>;
  return <Badge color="gray">{status}</Badge>;
};
