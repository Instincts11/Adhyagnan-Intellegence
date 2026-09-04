# Adhyagnan agent package
#
# Johannes Kepler: NASA archive + literature briefs
# Grace Hopper: candidate rows argued against physics

from .grace_hopper_agent import (
    analyze_exoplanet_with_grace_hopper,
    ExoplanetCharacteristics,
    MLPrediction
)

from .johannes_kepler_agent import (
    create_agent as create_johannes_kepler_agent
)

__version__ = "1.0.0"
__author__ = "Adhyagnan"
