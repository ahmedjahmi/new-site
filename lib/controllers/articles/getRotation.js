import dbConnect from '../../utils/dbConnect';
import Rotation from '../../../models/Rotation';

export default async function getRotation(id) {
	await dbConnect();
	const rotation = await Rotation.findOne({ article: id });
	return rotation;
}
