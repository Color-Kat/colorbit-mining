import React, {memo, PropsWithChildren} from 'react';
import JetModal, { ModalProps } from '@/Jetstream/Modal';
import Modal from "./Modal";

DialogModal.Content = memo(function DialogModalContent({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="px-6 py-4">
      <div className="text-lg font-semibold">{title}</div>

      <div className="mt-4">{children}</div>
    </div>
  );
});

DialogModal.Footer = memo(function DialogModalFooter({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return <div className="px-6 py-4 text-right border-red-600 border-t-2">{children}</div>;
});

export default function DialogModal({
  children,
  ...modalProps
}: PropsWithChildren<ModalProps>) {
  return <Modal {...modalProps}>{children}</Modal>;
}
