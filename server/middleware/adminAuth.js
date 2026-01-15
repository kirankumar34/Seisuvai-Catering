const adminAuth = (req, res, next) => {
    const passcode = req.headers['x-admin-passcode'];

    if (!passcode) {
        return res.status(401).json({ success: false, message: 'Admin access required' });
    }

    if (passcode !== process.env.ADMIN_PASSCODE) {
        return res.status(403).json({ success: false, message: 'Invalid admin passcode' });
    }

    next();
};

module.exports = adminAuth;
