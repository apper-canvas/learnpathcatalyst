import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { Link } from 'react-router-dom';
import ProgressBar from '@/components/molecules/ProgressBar';
const LessonVideoPlayer = ({ lesson, courseTitle, courseId, videoProgress, isVideoCompleted, onProgressChange }) => {
    const playerRef = useRef(null);

    const handleProgress = (progress) => {
        const progressPercentage = Math.round(progress.played * 100);
        onProgressChange(progressPercentage);
    };

    const handleEnded = () => {
        onProgressChange(100);
    };

    return (
        <div className="relative bg-black">
            <div className="aspect-video bg-gradient-to-br from-surface-800 to-surface-900">
                {lesson.videoUrl ? (
                    <ReactPlayer
                        ref={playerRef}
                        url={lesson.videoUrl}
                        width="100%"
                        height="100%"
                        controls={true}
                        playing={false}
                        onProgress={handleProgress}
                        onEnded={handleEnded}
                        config={{
                            file: {
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                            }
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <ApperIcon name="Play" className="w-10 h-10 ml-1" />
                            </div>
                            <h3 className="text-xl font-medium mb-2 break-words">{lesson.title}</h3>
                            <p className="text-white/70">Video not available</p>
                            <p className="text-white/50 text-sm mt-2">Duration: {lesson.duration} minutes</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                    <div className="text-white">
                        <h2 className="text-xl font-semibold break-words">{lesson.title}</h2>
                        <p className="text-white/70">{courseTitle}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Progress and Completion */}
                        <div className="flex items-center space-x-4">
                            {!isVideoCompleted && (
                                <Button
                                    onClick={() => onProgressChange(100)}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm"
                                >
                                    Complete Lesson
                                </Button>
                            )}
                            
                            {isVideoCompleted && (
                                <div className="flex items-center space-x-2 text-success">
                                    <ApperIcon name="CheckCircle" className="w-5 h-5" />
                                    <span className="text-sm font-medium">Completed</span>
                                </div>
                            )}
                        </div>
                        
                        <Link
                            to={`/courses/${courseId}`}
                            className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                            title="Back to course"
                        >
                            <ApperIcon name="X" className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 w-full max-w-md">
                    <ProgressBar 
                        progress={videoProgress} 
                        height="h-2" 
                        label="Progress"
                        showPercentage
                        className="text-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonVideoPlayer;