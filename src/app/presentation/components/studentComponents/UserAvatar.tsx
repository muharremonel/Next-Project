import React from 'react';
import { Man, Women } from '@/svgImports';

type UserAvatarProps = {
    user: {
      picture?: string;
      gender?: string; // gender özelliğini zorunlu olmaktan çıkardık
    };
    className?: string;
  };

const UserAvatar: React.FC<UserAvatarProps> = ({ user, className = '' }) => {
    
    if (user.picture) {
        return <img src={user.picture} alt="User Avatar" className={`rounded-full ${className}`} />;
    }

    return user.gender === 'man' ? <Man className={className} /> : <Women className={className} />;
};

export default UserAvatar;
