import React from 'react';
import {
  loadableConversationInfo,
  loadableCustomerAtom,
  loadableCustomerComplaintsAtom,
  loadableUnusedVouchersAtom,
  useConversation,
} from './useConversation';
import { useAtom } from 'jotai';
import { Price } from './Price';

export const CustomerInfo: React.FC = () => {
  const { conversation } = useConversation();
  const [conversationInfo] = useAtom(loadableConversationInfo);
  const [customerInfo] = useAtom(loadableCustomerAtom);
  const [complaints] = useAtom(loadableCustomerComplaintsAtom);
  const [vouchers] = useAtom(loadableUnusedVouchersAtom);
  return (
    <div>
      <h1>Thông tin Khách hàng</h1>
      <h2>Thông tin chung:</h2>
      <p>Conversation ID: {conversation?.conversationId}</p>
      <p>Customer ID: {conversation?.customerId}</p>
      <p>
        Phone:{' '}
        {conversationInfo.state === 'loading'
          ? 'Loading...'
          : conversationInfo.state === 'hasData'
          ? conversationInfo.data?.recentPhoneNumbers.join(', ')
          : 'Error'}
      </p>

      <h2>Thông tin web work</h2>
      {customerInfo.state === 'loading' && (
        <p>Đang tải thông tin khách hàng...</p>
      )}
      {customerInfo.state === 'hasData' && (
        <div>
          <p>Full Name: {customerInfo.data?.fullName}</p>
          <p>Cellphone: {customerInfo.data?.cellphone}</p>

          <div>
            <h3>Thông tin khiếu nại</h3>
            {complaints.state === 'hasData' && complaints.data.length > 0 && (
              <ul>
                {complaints.data.map((complaint) => (
                  <li key={complaint._id}>
                    <a
                      href={`https://work.4-handy.com/#!/complaints/${complaint._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {complaint.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {complaints.state === 'hasData' && complaints.data.length === 0 && (
              <p>Không có khiếu nại</p>
            )}
            {complaints.state === 'loading' && <p>Đang tải...</p>}
          </div>

          <div>
            <h3>Voucher có thể sử dụng</h3>
            {vouchers.state === 'hasData' && vouchers.data.length > 0 && (
              <ul>
                {vouchers.data.map((voucher) => (
                  <li key={voucher._id}>
                    <a
                      href={`https://work.4-handy.com/#!/vouchers/${voucher._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {voucher.name} - <Price value={voucher.quantity} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {vouchers.state === 'hasData' && vouchers.data.length === 0 && (
              <p>Không có voucher</p>
            )}
            {complaints.state === 'loading' && <p>Đang tải...</p>}
          </div>
        </div>
      )}
    </div>
  );
};
