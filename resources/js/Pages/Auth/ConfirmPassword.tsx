import { useForm, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@hooks/useRoute';
import JetValidationErrors from '@/Jetstream/ValidationErrors';
import AuthenticationCard from "../../components/auth/AuthenticationCard";
import Label from "../../components/auth/Label";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <JetValidationErrors className="mb-4" />

      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Confirm
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
