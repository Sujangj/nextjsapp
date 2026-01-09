import React from 'react';

type Props = {
	username: string;
	otp: string;
};

export function VerificationEmail({ username, otp }: Props) {
	return (
		<div>
			<p>Hi {username},</p>
			<p>Your verification code is: {otp}</p>
		</div>
	);
}
