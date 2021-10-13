import { useState } from 'react';
import Container from '../container';
import Card from '../card';
import styles from './profile.module.scss';
import Avatar from '../avatar';
import Heading from '../heading';
import { buildUrl } from 'cloudinary-build-url';
import distanceToNow from '../../lib/dateRelative';
import ProfileForm from './form';

function Profile({ dbUser, isAdmin, isUser, profileUser }) {
	const profileForm = {
		firstName: profileUser.firstName || '',
		lastName: profileUser.lastName || '',
		username: profileUser.username || '',
		image_url: '',
	};
	const [editProfile, setEditProfile] = useState(false);
	const handleEdit = () => {
		setEditProfile(!editProfile);
	};
	const { email, firstName, lastName, username, image_url, createdAt } =
		profileUser;
	const hasImage = image_url ? true : false;
	const imageSrc = (hasImage) => {
		if (hasImage) {
			const src = buildUrl(image_url, {
				cloud: {
					cloudName: 'ds2pg7vex',
				},
				// transformations: {
				// 	width: 40,
				// 	height: 40,
				// },
			});
			return src;
		}
		return 'https://via.placeholder.com/500';
	};

	return (
		<Container>
			<Heading size='h1'>Welcome, {username}</Heading>
			<Card>
				<div className={styles.profile}>
					<Avatar size={150} src={imageSrc(hasImage)} altInfo='some alt info' />
					<div className={styles.profileText}>
						<ul>
							<li>
								<b>First Name: </b>
								{typeof firstName !== 'undefined' ? firstName : "' '"}
							</li>
							<li>
								<b>Last Name: </b>
								{typeof lastName !== 'undefined' ? lastName : "' '"}
							</li>
							<li>
								<b>Email: </b>
								{typeof email !== 'undefined' ? email : "' '"}
							</li>
							<li>
								<b>Username: </b>
								{typeof username !== 'undefined' ? username : "' '"}
							</li>
							<li>
								Member since <time>{distanceToNow(createdAt)}</time>
							</li>
						</ul>
					</div>
					{(isAdmin || isUser) && (
						<div className={styles.profileButtonEdit}>
							<button onClick={handleEdit}>Edit</button>
						</div>
					)}
				</div>
			</Card>
			{editProfile && (
				<Card>
					<ProfileForm
						profileForm={profileForm}
						userId={dbUser._id}
						formId='profile-form'
					/>
				</Card>
			)}
		</Container>
	);
}

export default Profile;
